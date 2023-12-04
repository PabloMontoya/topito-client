import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderComp } from '../../tests/renderComp';
import * as authApi from '../../api/auth';
import SignupForm from './SignupForm';

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

jest.mock('../../api/auth', () => ({
  signup: jest.fn(),
}));

describe('SignupForm', () => {
  it('should render the signup form', () => {
    renderComp(<SignupForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it('should authenticate the user when signin form is filled and submitted', async () => {
    // Mock sessionStorage.setItem
    Storage.prototype.setItem = jest.fn();

    const fakeUser = {
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    authApi.signup.mockResolvedValueOnce({ code: 200 });

    renderComp(<SignupForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: fakeUser.email },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: fakeUser.password },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: fakeUser.confirmPassword },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // Wait for sessionStorage.setItem to be called
    await waitFor(() => {
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        'user_email',
        fakeUser.email
      );
    });
  });
});
