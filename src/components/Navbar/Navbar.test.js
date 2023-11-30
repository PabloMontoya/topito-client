import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render the navbar when user is authenticated', () => {
    render(
      <Router>
        <Navbar isAuthenticated={true} />
      </Router>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not render the navbar when user is not authenticated', () => {
    render(
      <Router>
        <Navbar isAuthenticated={false} />
      </Router>
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should sucessfully unauthenticate and clear session data when user logs out', () => {
    // Mock sessionStorage.clear()
    Storage.prototype.clear = jest.fn();

    render(
      <Router>
        <Navbar isAuthenticated={true} setIsAuthenticated={jest.fn()} />
      </Router>
    );

    // Simulate user clicking on the profile icon button
    const profileIconButton = screen.getByRole('button');
    fireEvent.click(profileIconButton);

    // Simulate user clicking on the logout button
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
