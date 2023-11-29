import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('should render the navbar with login info when authenticated', () => {
    // Mock sessionStorage
    Storage.prototype.getItem = jest.fn(() => 'Mock User');
    
    render(<Navbar isAuthenticated={true} />);
    expect(screen.getByText('Mock User')).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('should render the navbar without login info when not authenticated', () => {
    render(<Navbar isAuthenticated={false} />);
    expect(screen.queryByText(/logout/i)).toBeNull();
  });
});
