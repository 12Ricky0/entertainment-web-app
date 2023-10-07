import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';
import { Series } from '../Series';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BookmarkContext } from '../../App';


const server = setupServer(
    rest.get('https://entertainment-web-app-theta.vercel.app/bookmarked', (req, res, ctx) => {
        return res(ctx.json({
            bookmarkedResult: ['Undiscovered Cities']
        }));
    }),
    rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
        return res(ctx.status(200));
    })
)


var contextValue = {
    loggedIn: false,
    token: 'dkdiie838484jfjfuue4847',
    bookmarkedResult: 'Undiscovered Cities',
    setBookmarkedResult: jest.fn(),
};
const SeriesComponent = () => {
    return (
        <BrowserRouter>
            <BookmarkContext.Provider initialEntries={["/"]} value={contextValue} >
                <Series />
            </BookmarkContext.Provider>
        </BrowserRouter>

    )
}


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close());

describe('Series Component', () => {
    afterEach(() => server.resetHandlers())

    it('renders the series component', async () => {

        render(<SeriesComponent />);

        expect(screen.getByTestId('custom-element')).toHaveTextContent('Tv Series')
    });

    it('handles server errors', async () => {
        render(<SeriesComponent />);

        server.use(
            rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
                return res(ctx.status(201),
                    ctx.json({
                        errorMessage: 'Not authorized',
                    }),)
            }),
        )
        contextValue.bookmarkedResult = '';
        contextValue.loggedIn = false;

        const bookmarkIcon = screen.getAllByAltText('Bookmark')[0];
        fireEvent.click(bookmarkIcon);

        await waitFor(() => {
            expect(bookmarkIcon).toHaveAttribute('src', 'assets/icon-bookmark-empty.svg');
        })
        expect(window.location.pathname).toBe("/login");

    });

    it('toggle bookmark when user clicks', async () => {

        render(<SeriesComponent />);
        const bookmarkIcon = screen.getAllByAltText('Bookmark')[0];
        contextValue.loggedIn = true;
        server.use(
            rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
                return res(ctx.status(201),
                    ctx.json({
                        bookmarked: 'Undiscovered',
                    }),)
            }),
        )

        contextValue.bookmarkedResult = ('Undiscovered Cities')

        fireEvent.click(bookmarkIcon);

        await waitFor(() => {

            expect(bookmarkIcon).toHaveAttribute('src', 'assets/icon-bookmark-full.svg');

        })

    })

    it('returns the user search results', async () => {

        render(<SeriesComponent />);

        const searchInput = screen.getByPlaceholderText('Search for Movies or TV series'); // Replace with your actual placeholder text
        await act(async () => {
            userEvent.type(searchInput, '112');
        });

        await waitFor(() => {
            expect(screen.getByTestId('search')).toBeInTheDocument()

        })
        await act(async () => {
            await userEvent.clear(searchInput)

        });

    })

})

