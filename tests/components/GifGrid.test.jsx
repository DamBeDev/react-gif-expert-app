import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock("../../src/hooks/useFetchGifs");

describe('Pruebas en <GifGrid />', () => {

  const category = 'One Punch';
  
  test('Debe de mostrar el loading inicialmente', () => {

    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true
    })

    render( <GifGrid category={ category }/> );
    expect( screen.getByText( 'Cargando...' ) );
    expect( screen.getByText( category ) );

  });

  test('Debe de mostrar items cuando se cargan las imágenes de useFetchGifs', () => {

    const gifs = [
      {
        id: 'ABC',
        title: 'Saitama',
        url: 'https://one-punch.com/saitama.jpg'
      },
      {
        id: '123',
        title: 'Goku',
        url: 'https://dragonball.com/goku.jpg'
      },
    ]

    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false
    });

    render( <GifGrid category={ category }/> );
    expect( screen.getAllByRole('img').length ).toBe(2);
    
  });
})