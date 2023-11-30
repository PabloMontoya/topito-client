import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
