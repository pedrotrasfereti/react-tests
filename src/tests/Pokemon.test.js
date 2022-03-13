import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('testa o componente Pokemon', () => {
  // Extrair o número de id mostrado na URL
  const idPokemon = pokemons[0].id;
  const nomePokemon = pokemons[0].name;
  const tipoPokemon = pokemons[0].type;
  const pesoPokemonValor = pokemons[0].averageWeight.value;
  const pesoPokemonUnd = pokemons[0].averageWeight.measurementUnit;
  const imagemPokemon = pokemons[0].image;

  it('testa se a tela mostra o nome do pokemon correto', () => {
    // O nome mostrado na tela
    const nomeTela = screen.getByTestId('pokemon-name');

    // Verificar se o nome mostrado na tela é o mesmo que o do Pokemon
    expect(nomeTela).toHaveTextContent(nomePokemon);
  });

  it('testa se a tela mostra o tipo do pokemon correto', () => {
    // O tipo mostrado na tela
    const tipoTela = screen.getByTestId('pokemon-type');

    // Verificar se o tipo mostrado na tela é o mesmo que o do Pokemon encontrado
    expect(tipoTela).toHaveTextContent(tipoPokemon);
  });

  it('testa se a tela mostra o peso do pokemon corretamente', () => {
    // O peso mostrado na tela
    const pesoTela = screen.getByTestId('pokemon-weight');

    // Verificar se a tela mostra o peso do Pokemon corretamente
    expect(pesoTela)
      .toHaveTextContent(`Average weight: ${pesoPokemonValor} ${pesoPokemonUnd}`);
  });

  it('testa se a tela mostra a imagem do pokemon corretamente', () => {
    // A imagem mostrada na tela
    const imagemTela = screen.getByAltText(/sprite/i);

    // Verificar se o src da imagem mostrada na tela é a do pokemon encontrado
    expect(imagemTela).toHaveAttribute('src', imagemPokemon);

    // Verificar se o alt da imagem mostrada na tela é o nome do pokemon encontrado
    expect(imagemTela).toHaveAttribute('alt', `${nomePokemon} sprite`);
  });

  it('testa se o card do pokemon contém um link para os detalhes', () => {
    // O link mostrado na tela
    const detalhesTela = screen.getByRole('link', { name: /more details/i });

    // Verificar se o link mostrado na tela tem o caminho correto
    expect(detalhesTela).toHaveAttribute('href', `/pokemons/${idPokemon}`);
  });

  it('testa se ao clicar no link de mais detalhes há uma redireção para a pagina', () => {
    // O link mostrado na tela
    const detalhesTela = screen.getByRole('link', { name: /more details/i });

    // Clique no link
    userEvent.click(detalhesTela);

    // Verificar se id do url é o mesmo que o do Pokemon
    const tempo = 1000;
    setTimeout(() => {
      expect(window.location.pathname).toBe(`/pokemons/${idPokemon}`);
    }, tempo);

    // Verificar se os elementos da tela contém as informações do Pokemon
    const tituloDetalhes = screen.getByRole('heading', { name: /details/i });

    expect(tituloDetalhes).toHaveTextContent(`${nomePokemon} Details`);
  });

  it('testa se existe um icone de estrela nos pokemons favoritados', () => {
    // O link mostrado na tela
    const detalhesTela = screen.getByRole('link', { name: /more details/i });

    // Clique no link
    userEvent.click(detalhesTela);

    // O botão de favoritar o Pokemon
    const botãoFavoritar = screen.getByLabelText(/Pokémon favoritado?/i);

    // Clique no botão de favoritar
    userEvent.click(botãoFavoritar);

    // O icone de estrela
    const iconeFavoritado = screen.getByAltText(`${nomePokemon} is marked as favorite`);

    // Verificar se o icone de estrela está na tela
    expect(iconeFavoritado).toBeInTheDocument();
  });

  it('testa se o icone de estrela mostra a imagem correta', () => {
    // O link mostrado na tela
    const detalhesTela = screen.getByRole('link', { name: /more details/i });

    // Clique no link
    userEvent.click(detalhesTela);

    // O botão de favoritar o Pokemon
    const botãoFavoritar = screen.getByLabelText(/Pokémon favoritado?/i);

    // Clique no botão de favoritar --> deve ser refeito por causa do teste anterior
    userEvent.click(botãoFavoritar);
    userEvent.click(botãoFavoritar);

    // O icone de estrela
    const iconeFavoritado = screen.getByAltText(/is marked as favorite/i);

    // Verificar se o icone de estrela está na tela
    expect(iconeFavoritado).toHaveAttribute('src', '/star-icon.svg');
  });
});
