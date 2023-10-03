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


