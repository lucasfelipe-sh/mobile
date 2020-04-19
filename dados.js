class Dado extends React.Component 
{

    render(){

        return (
        <button className="dado" onClick = {() => {this.props.onClick()}} >
            {this.props.value}
        </button>
        );

    }
    
}

class Tabuleiro extends React.Component
{

    constructor (props)
    {

    super (props);
        this.state = {
            dados: Array(2).fill(),
            acertos: 0,
            erros: 0,
            status: null,
        };

    }

    renderizarDado (i)
    {

        return (
            <Dado
                value={this.state.dados[i]}
            />
        );

    }
  
    roll () 
    {
        const dados = this.state.dados.slice();
        let soma = 0;
        let input = document.getElementById("input").value;
        let acertos = this.state.acertos;
        let erros = this.state.erros;
      
        if(input == 0) 
        {

            alert("Tente novamente e digite um número válido");

        } else 
        {
            
            for (let i = 0; i < dados.length; i++){
                dados[i] = randomNumber();
                soma+=dados[i];
            }

            this.setState ({
                dados: dados,
            });

            if(input == soma) 
            {

                acertos++;
                this.setState ({
                    acertos: acertos,
                    status: "Parabéns!! Você acertou! :)"
                });

            } else 
            {

                erros++;
                this.setState ({
                    erros: erros,
                    status: "Poxa, Você errou. A soma era " + soma + " :(",
                });

            }

        }

    }

    render() {

        return (
            <div>
                <div className = "guess">
                    <h3> Adivinhe a soma dos dados: </h3>
                </div>
                <div className = "input">
                    <input type = "text" id = "input"></input>
                    <p>{this.state.status}</p>
                </div>
                <button onClick = {() => {this.roll()}}> Rolar </button>
                <div className = "board-row">
                    {this.renderizarDado(0)}
                    {this.renderizarDado(1)}
                </div>
                <div className = "acertos"> Você acertou {this.state.acertos} e errou {this.state.erros} </div>
            </div>
        );

    }

}

function randomNumber() 
{

  let num = Math.ceil(Math.random()*10);

    if(num >= 0 && num <= 6) {
        return num;
    } else {
        return randomNumber();
    }

}

ReactDOM.render (
    <Tabuleiro dados = {Array(2).fill()} />,
    document.getElementById("root")

);