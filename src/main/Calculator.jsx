import React, { Component } from "react";
import './Calculator.css';

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0', //Valor apresentado no display da calculadora
    clearDisplay: false, //Se precisa limpar ou não o display
    operation: null, //Armazena a operação
    values: [0, 0], //Posição 0 vai acumulando os valores de acordo com a operação, posição 1 novo valor digitado
    current: 0 //Qual a posição do values estou manipulando [0] ou [1]
}

export default class Calculator extends Component {

    state = { ...initialState }; //estado recebendo o estado inicial

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    /**
     * Apenas restaura o state para o estado inicial "initialState"
     */
    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        console.log(operation)
    }

    /**
     * Ações quando é digitado um novo dígito
     */
    addDigit(n) {

        if (n === '.' && this.state.displayValue.includes('.')) { //Só pode haver um ponto no numero do display
            return;
        }

        const clearDisplay = this.state.displayValue === '0' //Limpar o display se o valor for 0 ou
            || this.state.clearDisplay //limpar o display se this.state.clearDisplay == true
        const currentValue = clearDisplay ? '' : this.state.displayValue; //Se for para limpar o display ele vai recever ''
        const displayValue = currentValue + n; //Display recebe o valor setado anteriormente = valor passado em n
        this.setState({ displayValue, clearDisplay: false }); //Passa o display e seta clearDisplay como false

        if (n !== '.') {
            const i = this.state.current; //Qual a posição do array values estou usando
            const newValue = parseFloat(displayValue); //Valor digitado no display transformado em float
            const values = [...this.state.values]; //clona o array this.state.values
            values[i] = newValue; //array values na posição corrente recebe o novo valor
            this.setState({ values }); //Seta os valores no state
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={() => this.clearMemory()} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        );
    }
}

