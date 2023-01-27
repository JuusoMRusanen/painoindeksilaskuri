import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const testit = [
  {nimi : 'Virheilmoitus, kun pituus on enemmän kuin 230cm', arvo : 231, kohde : "pituus"},
  {nimi : 'Virheilmoitus, kun pituus on vähemmän kuin 100cm', arvo : 99, kohde : "pituus"},
  {nimi : 'Virheilmoitus, kun paino on enemmän kuin 230kg', arvo : 231, kohde : "paino"},
  {nimi : 'Virheilmoitus, kun paino on vähemmän kuin 30kg', arvo : 29, kohde : "paino"}
];

testit.forEach(testi => {
  test(`${testi.nimi} (${testi.arvo})`, () => {
    render(<App />);

    const kohde = screen.getByTestId(testi.kohde);
    const nappi = screen.getByTestId("nappi");
  
    fireEvent.change(kohde, { target : {value : testi.arvo} });
    fireEvent.click(nappi);
  
    const virheilmoitus = screen.getByTestId("virheilmoitus");
  
    expect(virheilmoitus).toBeInTheDocument();
  });
});

for (let i=12.5; i<=42.5; i+=0.1) {
  i = Math.round(i * 10) / 10;
  test(`Painoindeksin luokitus on määritelty välillä 12,5-42,5 yhden desimaalin tarkkuudella (${i})`, () => {
    render(<App painoindeksi={i} />);

    const nappi = screen.getByTestId("nappi");

    fireEvent.click(nappi);

    const luokitus = screen.getByTestId("luokitus");

    expect(luokitus.innerHTML).not.toContain("ei määritelty");
  });
}
