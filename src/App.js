import {useState} from 'react';

function App(props) {

  const [tulos, setTulos] = useState(); 
  const [pituus, setPituus] = useState();
  const [paino, setPaino] = useState();
  const [virhe, setVirhe] = useState();

  const [luokitus, setLuokitus] = useState();
  const [luokitusVari, setLuokitusVari] = useState();
  
  const laskeBMI = () => {

    if (props.painoindeksi) {
      setTulos(props.painoindeksi);
      maaritaLuokka(props.painoindeksi);
    } else {
      if (pituus >= 100 && pituus <= 230 && paino >= 30 && paino <= 230){

        setTulos(Math.round((paino / (pituus * 0.01) / (pituus * 0.01) * 100)) / 100);
        maaritaLuokka(Math.round((paino / (pituus * 0.01) / (pituus * 0.01) * 100)) / 100);
        setVirhe("");

      } else {
        setLuokitus();
        setLuokitusVari();
        setTulos();
        setVirhe("Syöttötiedoissa on virhe. Käytä ainoastaan numeerisia arvoja väliltä 100 - 230 cm ja 30 - 230 kg");
      }
    }
  }

  const maaritaLuokka = (luku) => {
    if(luku < 15)
    {setLuokitus("sairaalloinen alipaino"); setLuokitusVari("danger");}

    else if(luku >= 15 && luku < 17)
    {setLuokitus("merkittävä alipaino"); setLuokitusVari("warning");}

    else if(luku >= 17 && luku < 18.5)
    {setLuokitus("normaalia alhaisempi paino"); setLuokitusVari("info");}

    else if(luku >= 18.5 && luku < 25)
    {setLuokitus("normaali paino"); setLuokitusVari("success");}
    
    else if(luku >= 25 && luku < 30)
    {setLuokitus("lievä ylipaino"); setLuokitusVari("info");}

    else if(luku >= 30 && luku < 35)
    {setLuokitus("merkittävä ylipaino"); setLuokitusVari("warning");}

    else if(luku >= 35 && luku <= 40)
    {setLuokitus("vaikea ylipaino"); setLuokitusVari("danger");}

    else if(luku > 40)
    {setLuokitus("sairaalloinen ylipaino"); setLuokitusVari("danger");}

    else{setLuokitus("ei määritelty"); setLuokitusVari("secondary");}
  }

  return (
    <div className="container">
      
      <h1>Painoindeksilaskuri</h1>

      <h2>Syötä pituus ja paino</h2>

      <input 
        data-testid="pituus"
        type="text" 
        className="form-control mb-2" 
        placeholder="Anna pituus väliltä 100 - 230 cm"  
        onChange={ (e) => {
                    setPituus(e.target.value);
                  } } 
      />

      <input 
        data-testid="paino"
        type="text" 
        className="form-control mb-2" 
        placeholder="Anna paino väliltä 30 - 230 kg"  
        onChange={ (e) => {
                    setPaino(e.target.value);
                  } } 
      />

      <button 
        data-testid="nappi"
        className="btn btn-primary btn-block" 
        onClick={laskeBMI}
      >Laske BMI</button>

      {(tulos) 
        ? (
          <div 
            data-testid="tulos"
            className="card card-body mt-2"
          >
          {tulos}
          </div>
          )
        : null 
      }

      {(luokitus) 
      ? (
        <div 
          data-testid="luokitus"
          className={"alert alert-"+luokitusVari}
          role="alert"
          >
        {luokitus}
        </div>
        )
      : null
      }

      {(virhe)
        ? (
          <div  
            data-testid="virheilmoitus"
            className="alert alert-danger" 
            role="alert"
          >
          {virhe}
          </div>
          )
        : null
      }

      <div 
        className="card card-body mt-2"
      >
        <h4>Infoa</h4>
        <p>Tämän harjoituksen tarkoitus oli harjoitella React -sovelluksen ohjelmallista testaamista. Testin löytyvät lähdekoodeista. Katso Githubista!</p>
      </div>

    </div>
  );

}

export default App;
