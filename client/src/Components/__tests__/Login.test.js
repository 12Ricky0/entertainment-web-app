// import { render, fireEvent, screen, waitFor, act, cleanup } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import React from 'react';
// import '@testing-library/jest-dom';
// import { Login } from '../Login';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import { BookmarkContext } from '../../App';




// const server = setupServer(
//     rest.post('https://entertainment-web-app-theta.vercel.app/login', async (req, res, ctx) => {

//         return res(ctx.json({
//             token: 'dkdiieie838484jfjfuue48477575756jcfh',
//             bookmarked: ['The Bad'
//             ],
//             loggedIn: true
//         }))
//     })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close());
// afterEach(cleanup)


// const mockSetToken = jest.fn();
// const mockSetLoggedIn = jest.fn();
// const mockSetBookmarkedResult = jest.fn();
// jest.useFakeTimers();

// const contextValue = {
//     loggedIn: false,
//     setLoggedIn: mockSetLoggedIn,
//     token: '',
//     setToken: mockSetToken,
//     setBookmarkedResult: mockSetBookmarkedResult,
// };

// const LoginComponent = () => {
//     return (
//         <BrowserRouter>
//             <BookmarkContext.Provider value={contextValue}>
//                 <Login />
//             </BookmarkContext.Provider>
//         </BrowserRouter>

//     )
// }



// describe('Login Component', () => {

//     it('should render the login page when not logged in', () => {
//         render(<LoginComponent />);
//         contextValue.loggedIn = true;

//         expect(screen.getByText('Login')).toBeInTheDocument()
//         expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
//         expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
//         expect(screen.getByTestId('main')).not.toHaveTextContent('Logged In as')
//     });

//     it('renders the loading spinner and loggedIn page', async () => {
//         render(<LoginComponent />);
//         contextValue.loggedIn = true;

//         expect(screen.getByTestId('main')).toHaveTextContent('Logged In as')

//         const logoutButton = screen.getByTestId('logout-button');
//         fireEvent.click(logoutButton);
//         await act(async () => {
//             jest.advanceTimersByTime(3000);
//             expect(screen.getByTestId('main')).toHaveTextContent('Loading...')
//         });

//     })

//     it('Shows login page when user logout', async () => {
//         render(<LoginComponent />);
//         contextValue.loggedIn = false;

//         const logoutButton = screen.getByRole('button');
//         fireEvent.click(logoutButton);
//         await waitFor(() => {
//             expect(screen.getByTestId('main')).toHaveTextContent('Login to your Account')

//         });
//         expect(contextValue.loggedIn).toBeFalsy();
//     })

//     it('handles input change and displays error message', async () => {
//         render(<LoginComponent />);

//         const emailInput = screen.getByPlaceholderText('Email Address');
//         const passwordInput = screen.getByPlaceholderText('Password');
//         const loginButton = screen.getByText('Login to your Account');

//         fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//         fireEvent.change(passwordInput, { target: { value: 'password123' } });
//         fireEvent.click(loginButton);


//         await waitFor(() => {
//             expect(screen.getByText('Invalid Email/Password')).toBeInTheDocument();

//         });
//         expect(emailInput.value).toBe('test@example.com');
//         expect(passwordInput.value).toBe('password123');


//     })

//     it('renders the loading spinner during login', async () => {
//         render(<LoginComponent />);
//         const loginButton = screen.getByText('Login to your Account');
//         const emailInput = screen.getByPlaceholderText('Email Address');
//         const passwordInput = screen.getByPlaceholderText('Password');


//         fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//         fireEvent.change(passwordInput, { target: { value: 'password123' } });
//         fireEvent.click(loginButton);
//         contextValue.loggedIn = true;



//         await waitFor(() => {
//             expect(screen.getByTestId('main')).toHaveTextContent('Loading...')

//         });

//         await act(async () => {
//             jest.advanceTimersByTime(4000);
//             contextValue.loggedIn = true;
//         });
//         expect(screen.getByTestId('main')).toHaveTextContent('Logged In as')
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


