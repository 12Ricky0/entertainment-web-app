// import { render, screen, waitFor, act } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import React from 'react';
// import '@testing-library/jest-dom';
// import { Bookmarked } from '../Bookmarked';
// import { BookmarkContext } from '../../App';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import userEvent from '@testing-library/user-event';

// const server = setupServer(
//     rest.get('https://entertainment-web-app-theta.vercel.app/bookmarked', async (req, res, ctx) => {

//         return res(ctx.json({
//             token: 'dkdiieie838484jfjfuue48477575756jcfh',
//             bookmarked: ['The Bad', '1998'
//             ],
//             loggedIn: true
//         }))
//     })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close());


// const mockSetBookmarkedResult = jest.fn();


// var contextValue = {
//     loggedIn: true,
//     token: 'dkdiie838484jfjfuue4847',
//     bookmarkedResult: ['Bottom Gear', 'The Diary'],
//     setBookmarkedResult: mockSetBookmarkedResult
// };


// const BookmarkedComponent = () => {
//     return (
//         <BrowserRouter>
//             <BookmarkContext.Provider value={contextValue}>
//                 <Bookmarked />
//             </BookmarkContext.Provider>
//         </BrowserRouter>

//     )
// }

// describe('Bookmarked component', () => {

//     it('Render the bookmarked component', async () => {
//         render(<BookmarkedComponent />)

//         expect(screen.getByText('Bottom Gear')).toBeInTheDocument()
//         expect(screen.getByText('The Diary')).toBeInTheDocument()
//     })

//     it('returns the user search results', async () => {

//         render(<BookmarkedComponent />);

//         const searchInput = screen.getByPlaceholderText('Search for Movies or TV series'); // Replace with your actual placeholder text
//         await act(async () => {
//             userEvent.type(searchInput, 'The Diary');
//         });

//         await waitFor(() => {
//             expect(screen.queryByTestId('search')).not.toBeInTheDocument()

//         })
//         await act(async () => {
//             await userEvent.clear(searchInput)

//         });

//     })

//     it('Remove the bookmarked component when clicked', async () => {
//         render(<BookmarkedComponent />)

//         server.use(
//             rest.patch('https://entertainment-web-app-theta.vercel.app/bookmarks', async (req, res, ctx) => {
//                 return res(ctx.status(200))

//             })
//         )

//         const bookmark = screen.getAllByAltText('Bookmark')[1]
//         const element = screen.getByTestId('bookmark-element')

//         await act(async () => {
//             await userEvent.click(bookmark)
//         });

//         expect(bookmark).toHaveAttribute('src', 'assets/icon-bookmark-full.svg');

//         await waitFor(() => {
//             expect(element).toHaveTextContent('Bottom Gear')
//         })

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


