import React from 'react';
import ReactDOM from 'react-dom';
import '/scss/main.scss';
import Select from './Select';
import Table from './Table';
import Form from './Form';
import Button from './Button';
import Pagination from './Pagination';
import Card from './Card';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            small: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
            big: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
            selectVal: 'getselect',
            form: [
                { name: 'id', type: 'text', pattern: '^[ 0-9]+$' },
                { name: 'firstName', type: 'text', pattern: '^[A-zА-яЁё]+$' },
                { name: 'lastName', type: 'text', pattern: '^[A-zА-яЁё]+$' },
                { name: 'email', type: 'email', pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' },
                { name: 'phone', type: 'tel', pattern: '^[ 0-9]+$' }
            ],
            thead: ['id', 'firstName', 'lastName', 'email', 'phone'],
            selectedBase: '',
            buttonText: ['Показать', 'Загрузка...'],
            MAX_ROWS: 50,
            isBig: false,
            pages: '',
            currentPage: '0',
            showTable: false,
            renderedBase: '',
            isSelected: '',
            selectedPerson: '',
            disabled: true,
            isCollapse: true,
        };
    }

    setBase(e) {
        const val = e.target.value
        const base = this.state[val]
        const btnEl = document.getElementById('btn')
        btnEl.setAttribute('disabled', 'disabled')
        btnEl.textContent = this.state.buttonText[1]

        fetch(base)
        .then(response => response.json())
        .then(response => {
            this.setState({
                selectedBase: response
            })
            btnEl.removeAttribute('disabled')
            btnEl.textContent = this.state.buttonText[0]
        })
    }

    checkBase() {
        if (this.state.selectedBase.length > this.state.MAX_ROWS) {
            this.setState({
                isBig: true
            })

            this.splitBase()
        } else {
            this.setRenderedBase()
        }
    }

    setRenderedBase() {
        this.setState((state) => {
            return { renderedBase: state.selectedBase }
        });
    }

    getPages() {
        let baseLength = this.state.selectedBase.length;
        const pages = [];

        for (let i = 0; i * this.state.MAX_ROWS < baseLength; i++) {
            pages.push(i);
        }

        this.setState({
            pages: pages
        })
    }

    setCurrentPage(e) {
        const value = e.target.textContent - 1;

        this.setState({
            currentPage: value
        })
    }

    showTable() {
        this.getPages()
        this.checkBase()

        this.setState({
            showTable: true
        })
    }

    splitBase() {
        const subarray = [];
        const base = this.state.selectedBase;
        const rows = this.state.MAX_ROWS;

        for (let i = 0; i < Math.ceil(base.length / rows); i++) {
            subarray[i] = base.slice((i * rows), (i * rows) + rows);
        }

        this.setState({
            renderedBase: subarray
        })
    }

    filterBase(e) {
        const newBase = Array.from(this.state.selectedBase);
        const parameter = e.target.textContent
        const sort = e.target.getAttribute('data_sort');

        if (parameter === 'id') {
            if (sort === 'asc') {
                newBase.sort(function (a, b) {
                    return a[parameter] - b[parameter]
                });
            } else {
                newBase.sort(function (a, b) {
                    return b[parameter] - a[parameter]
                });
            }
        }

        if (parameter === 'firstName' || parameter === 'lastName' || parameter === 'email') {
            newBase.sort(function (a, b) {
                const firts = a[parameter].toLowerCase();
                const second = b[parameter].toLowerCase();
                if (sort === 'asc') {
                    if (firts < second)
                        return -1
                    if (firts > second)
                        return 1
                    return 0
                } else {
                    if (second < firts)
                        return -1
                    if (second > firts)
                        return 1
                    return 0
                }
            })
        }

        if (parameter === 'phone') {
            newBase.sort(function (a, b) {
                const first = a[parameter].match(/\d/g).join('');
                const second = b[parameter].match(/\d/g).join('');

                if (sort === 'asc') {
                    return first - second
                } else {
                    return second - first
                }
            })
        }

        this.setState({
            selectedBase: newBase,
        })

        this.showTable()
    }

    checkInputs() {
        const form = document.getElementById('js-form');
        const arr = Array.from(form.elements);

        arr.find(e => e.value === '') ? this.setState({ disabled: true }) : this.setState({ disabled: false })

    }

    addPerson(e) {
        e.preventDefault();
        const newBase = this.state.selectedBase;
        const form = document.getElementById('js-form');
        const arr = Array.from(form.elements);
        const person = new Object();

        arr.map(e => {
            person[e.name] = e.value
        })

        newBase.unshift(person)
        form.reset()

        this.setState({
            selectedBase: newBase,
            disabled: true,
            isCollapse: !this.state.isCollapse
        })

        this.showTable()
    }

    getPerson(e) {
        let base;
        const key = e.target.parentElement.getAttribute('data_id')
        this.state.isBig ? base = this.state.renderedBase[this.state.currentPage] : base = this.state.renderedBase;
        base.map((person, i) => {
            if (key == i) {
                this.setState({
                    isSelected: true,
                    selectedPerson: person
                })
            }
        })
    }

    toggleCollapse() {
        this.setState({
            isCollapse: !this.state.isCollapse
        })
    }

    render() {
        return (
            <>
                <div className="container">
                    {
                        this.state.showTable ?
                            <>
                                <p>
                                <Button
                                className='btn btn-primary'
                                onClick={this.toggleCollapse.bind(this)}
                                text='Добавить'
                                />
                                </p>
                                <div className={this.state.isCollapse ? 'collapse' : 'collapse show'} id="collapseExample">
                                    <Form
                                        id='js-form'
                                        className='container form'
                                        form={this.state.form}
                                        submitHandle={this.addPerson.bind(this)}
                                        disabled={this.state.disabled}
                                        checkInputs={this.checkInputs.bind(this)}
                                    />
                                </div>    
                                <Table
                                    className='table table-dark table-striped'
                                    base={this.state.renderedBase}
                                    currentPage={this.state.currentPage}
                                    isBig={this.state.isBig}
                                    filter={this.filterBase.bind(this)}
                                    getPerson={this.getPerson.bind(this)}
                                    colNames={this.state.thead}
                                />

                                {this.state.isBig ?
                                    <Pagination
                                        pages={this.state.pages}
                                        clickHandler={this.setCurrentPage.bind(this)}
                                    />
                                    : ''
                                }
                                {this.state.isSelected ?
                                    <Card
                                        person={this.state.selectedPerson}
                                    />
                                    : ''
                                }
                            </>
                            :
                            <>
                                <Select
                                    className='form-select form-select-lg mb-3'
                                    buttonText={this.state.buttonText}
                                    defaultValue={this.state.selectVal}
                                    onChange={this.setBase.bind(this)}
                                />
                                <Button
                                    id='btn'
                                    className='btn btn-primary'
                                    onClick={this.showTable.bind(this)}
                                    text={this.state.buttonText[0]}
                                />
                            </>
                    }
                </div>
            </>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#app')
);