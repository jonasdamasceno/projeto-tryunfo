import React from 'react';
// import PropTypes from 'prop-types';
// import '../App.css';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardList: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.handleChangeBtn);
  };

  handleTrunfo = () => {
    const { cardList } = this.state;
    return this.setState({
      hasTrunfo: cardList.some((el) => el.cardTrunfo),
    });
  };

  handleDeleteCard = ({ target }) => {
    const { cardList } = this.state;
    console.log(target.parentNode);
    console.log(target.parentNode.firstChild);
    console.log(target.parentNode.firstChild.innerText);
    console.log(target.id);

    const newCardList = cardList.filter(({ cardName }) => cardName
    !== target.id);

    this.setState({
      cardList: newCardList,
    }, () => {
      target.parentNode.remove();
      this.handleTrunfo();
    });
  };

  handleChangeBtn = () => {
    const maxSum = 210;
    const maxAttr = 90;

    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;

    if ((cardName
      && cardDescription
      && cardImage
      && cardAttr1
      && cardAttr2
      && cardAttr3)
      && (+cardAttr1 >= 0 && +cardAttr2 >= 0 && +cardAttr3 >= 0)
      && (+cardAttr1 + +cardAttr2 + +cardAttr3 <= maxSum)
      && (+cardAttr1 <= maxAttr
        && +cardAttr2 <= maxAttr
        && +cardAttr3 <= maxAttr
      )
    ) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else this.setState({ isSaveButtonDisabled: true });
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardList,
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      // isSaveButtonDisabled,
    } = this.state;

    cardList.push({ cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      // isSaveButtonDisabled,
    });
    this.setState({
      cardList,
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
      // isSaveButtonDisabled: true,
    }, this.handleTrunfo);
  };

  render() {
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      // cardList,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardImage={ cardImage }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardImage={ cardImage }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />

        {
          cardList.map((item) => (
            <li key={ item.cardName }>
              <Card
                cardName={ item.cardName }
                cardImage={ item.cardImage }
                cardDescription={ item.cardDescription }
                cardAttr1={ item.cardAttr1 }
                cardAttr2={ item.cardAttr2 }
                cardAttr3={ item.cardAttr3 }
                cardRare={ item.cardRare }
                cardTrunfo={ item.cardTrunfo }
              />
              <button
                type="submit"
                id={ item.cardName }
                data-testid="delete-button"
                onClick={ this.handleDeleteCard }
              >
                Excluir
              </button>

            </li>))
        }
      </div>
    );
  }
}

export default App;
