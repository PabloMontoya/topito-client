import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderComp } from '../../tests/renderComp';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render the navbar when user is authenticated', () => {
    renderComp(<Navbar />, { authConfig: { isAuthenticated: true } });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should not render the navbar when user is not authenticated', () => {
    renderComp(<Navbar />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should sucessfully unauthenticate and clear session data when user logs out', () => {
    // Mock sessionStorage.clear()
    Storage.prototype.clear = jest.fn();

    renderComp(<Navbar />, { authConfig: { isAuthenticated: true } });

    // Simulate user clicking on the profile icon button
    const profileIconButton = screen.getByRole('button');
    fireEvent.click(profileIconButton);

    // Simulate user clicking on the logout button
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
