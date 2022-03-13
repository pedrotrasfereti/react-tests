import React from 'react';

import { render, screen } from '@testing-library/react';
import About from '../components/About';

beforeEach(() => render(<About />));

describe('testa o componente About', () => {
  it('testa o titulo', () => {
    const titulo = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(titulo).toBeInTheDocument();
  });

  it('testa os dois paragrafos', () => {
    const paragrafos = screen.getAllByText(/Pokémons/i);

    expect(paragrafos.length).toBe(2);
  });

  it('testa a imagem', () => {
    const imagem = screen.getByRole('img');

    expect(imagem).toBeInTheDocument();

    expect(imagem).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
