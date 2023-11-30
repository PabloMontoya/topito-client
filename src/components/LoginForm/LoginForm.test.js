import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

// Mock the google object
global.google = {
  accounts: {
    id: {
      initialize: jest.fn(),
      renderButton: jest.fn(),
      prompt: jest.fn(),
    },
  },
};

describe('LoginForm', () => {
  it('should render the login form', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should authenticate the user when login form is filled and submitted', async () => {
    // Mock sessionStorage.setItem
    Storage.prototype.setItem = jest.fn();

    const fakeUser = { email: 'user@example.com', password: 'password123' };

    render(
      <BrowserRouter>
        <LoginForm setIsAuthenticated={jest.fn()} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: fakeUser.email },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: fakeUser.password },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for sessionStorage.setItem to be called
    await waitFor(() => {
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        'user_email',
        fakeUser.email
      );
    });
  });
});
