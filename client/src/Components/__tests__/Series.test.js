// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
// import { BrowserRouter } from 'react-router-dom';
// import React from 'react';
// import '@testing-library/jest-dom';
// import { Series } from '../Series';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import { BookmarkContext } from '../../App';


// const server = setupServer(
//     rest.get('https://entertainment-web-app-theta.vercel.app/bookmarked', (req, res, ctx) => {
//         return res(ctx.json({
//             bookmarkedResult: ['Undiscovered Cities']
//         }));
//     }),
//     rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
//         return res(ctx.status(200));
//     })
// )


// var contextValue = {
//     loggedIn: false,
//     token: 'dkdiie838484jfjfuue4847',
//     bookmarkedResult: 'Undiscovered Cities',
//     setBookmarkedResult: jest.fn(),
// };
// const SeriesComponent = () => {
//     return (
//         <BrowserRouter>
//             <BookmarkContext.Provider initialEntries={["/"]} value={contextValue} >
//                 <Series />
//             </BookmarkContext.Provider>
//         </BrowserRouter>

//     )
// }


// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close());

// describe('Series Component', () => {
//     afterEach(() => server.resetHandlers())

//     it('renders the series component', async () => {

//         render(<SeriesComponent />);

//         expect(screen.getByTestId('custom-element')).toHaveTextContent('Tv Series')
//     });

//     it('handles server errors', async () => {
//         render(<SeriesComponent />);

//         server.use(
//             rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
//                 return res(ctx.status(201),
//                     ctx.json({
//                         errorMessage: 'Not authorized',
//                     }),)
//             }),
//         )
//         contextValue.bookmarkedResult = '';
//         contextValue.loggedIn = false;

//         const bookmarkIcon = screen.getAllByAltText('Bookmark')[0];
//         fireEvent.click(bookmarkIcon);

//         await waitFor(() => {
//             expect(bookmarkIcon).toHaveAttribute('src', 'assets/icon-bookmark-empty.svg');
//         })
//         expect(window.location.pathname).toBe("/login");

//     });

//     it('toggle bookmark when user clicks', async () => {

//         render(<SeriesComponent />);
//         const bookmarkIcon = screen.getAllByAltText('Bookmark')[0];
//         contextValue.loggedIn = true;
//         server.use(
//             rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', (req, res, ctx) => {
//                 return res(ctx.status(201),
//                     ctx.json({
//                         bookmarked: 'Undiscovered',
//                     }),)
//             }),
//         )

//         contextValue.bookmarkedResult = ('Undiscovered Cities')

//         fireEvent.click(bookmarkIcon);

//         await waitFor(() => {

//             expect(bookmarkIcon).toHaveAttribute('src', 'assets/icon-bookmark-full.svg');

//         })

//     })

//     it('returns the user search results', async () => {

//         render(<SeriesComponent />);

//         const searchInput = screen.getByPlaceholderText('Search for Movies or TV series'); // Replace with your actual placeholder text
//         await act(async () => {
//             userEvent.type(searchInput, '112');
//         });

//         await waitFor(() => {
//             expect(screen.getByTestId('search')).toBeInTheDocument()

//         })
//         await act(async () => {
//             await userEvent.clear(searchInput)

//         });

//     })

// })

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Header } from '../Heading';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';



const HeaderComponent = () => {
    return (
        <BrowserRouter initialEntries={["/"]}>
            <Header />
        </BrowserRouter>

    )
}

describe('HeaderComponent', () => {

    it('should render bookmark navigation', async () => {
        render(<MemoryRouter >
            <Header />
        </MemoryRouter>
        )
        const bookmark = screen.getByTestId('bookmarked')
        const homeIcon = screen.getByAltText("Movie");

        expect(bookmark).toBeInTheDocument();
        expect(homeIcon).toBeInTheDocument();
    });

    it('should highlight the Home icon when clicking on it', () => {
        render(<HeaderComponent />)
        const homeIcon = screen.getByTestId('container');
        const bookmark = screen.getByTestId('bookmarked')

        fireEvent.click(homeIcon);
        expect(homeIcon).toHaveClass("active");
        expect(bookmark).not.toHaveClass("active");
        expect(window.location.pathname).toBe("/login");

    })

    it('redirects to the right page when clicked', async () => {
        render(<HeaderComponent />)


        const bookmarkIcon = screen.getByTestId("bookmarked");
        const seriesIcon = screen.getByTestId("series");
        const movieIcon = screen.getByTestId("movies");
        const homeIcon = screen.getByAltText("Movie");
        const homIcon = screen.getByTestId("hom");


        fireEvent.click(bookmarkIcon);
        expect(window.location.pathname).toBe("/bookmarked");
        fireEvent.click(movieIcon);
        expect(window.location.pathname).toBe("/movies");
        fireEvent.click(homeIcon);
        expect(window.location.pathname).toBe("/");
        fireEvent.click(homIcon);
        expect(window.location.pathname).toBe("/");

        fireEvent.click(seriesIcon);
        await waitFor(() => {
            expect(window.location.pathname).toBe("/series");

        })
    })

});


