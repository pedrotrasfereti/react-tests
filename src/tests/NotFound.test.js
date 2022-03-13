import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

beforeEach(() => render(<NotFound />));

describe('testa o componente Not Found', () => {
  it('testa o titulo', () => {
    const titulo = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });

    expect(titulo).toBeInTheDocument();
  });

  it('testa a imagem', () => {
    const imagem = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(imagem).toBeInTheDocument();

    expect(imagem).toHaveAttribute(
      'src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
