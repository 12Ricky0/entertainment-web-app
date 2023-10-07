import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';
import { Bookmarked } from '../Bookmarked';
import { BookmarkContext } from '../../App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

const server = setupServer(
    rest.get('https://entertainment-web-app-theta.vercel.app/bookmarked', async (req, res, ctx) => {

        return res(ctx.json({
            token: 'dkdiieie838484jfjfuue48477575756jcfh',
            bookmarked: ['The Bad', '1998'
            ],
            loggedIn: true
        }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close());


const mockSetBookmarkedResult = jest.fn();


var contextValue = {
    loggedIn: true,
    token: 'dkdiie838484jfjfuue4847',
    bookmarkedResult: ['Bottom Gear', 'The Diary'],
    setBookmarkedResult: mockSetBookmarkedResult
};


const BookmarkedComponent = () => {
    return (
        <BrowserRouter>
            <BookmarkContext.Provider value={contextValue}>
                <Bookmarked />
            </BookmarkContext.Provider>
        </BrowserRouter>

    )
}

describe('Bookmarked component', () => {

    it('Render the bookmarked component', async () => {
        render(<BookmarkedComponent />)

        expect(screen.getByText('Bottom Gear')).toBeInTheDocument()
        expect(screen.getByText('The Diary')).toBeInTheDocument()
    })

    it('returns the user search results', async () => {

        render(<BookmarkedComponent />);

        const searchInput = screen.getByPlaceholderText('Search for Movies or TV series'); // Replace with your actual placeholder text
        await act(async () => {
            userEvent.type(searchInput, 'The Diary');
        });

        await waitFor(() => {
            expect(screen.queryByTestId('search')).not.toBeInTheDocument()

        })
        await act(async () => {
            await userEvent.clear(searchInput)

        });

    })

    it('Remove the bookmarked component when clicked', async () => {
        render(<BookmarkedComponent />)

        server.use(
            rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', async (req, res, ctx) => {
                return res(ctx.status(200))

            })
        )

        const bookmark = screen.getAllByAltText('Bookmark')[1]
        const element = screen.getByTestId('bookmark-element')

        await act(async () => {
            await userEvent.click(bookmark)
        });

        expect(bookmark).toHaveAttribute('src', 'assets/icon-bookmark-full.svg');

        await waitFor(() => {
            expect(element).toHaveTextContent('Bottom Gear')
        })

    })

})


