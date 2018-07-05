import React, { Component } from 'react';
import logo from './logo.svg';

import Table from './components/Table';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Test Tables</h1>
        </header>

        <div className="App-intro">
          <p>
            Сделать интерактивную таблицу статистики. Данные взять отсюда: pastebin.com/fEsaaKb7<br />
            <br />
            Требования:<br />
            1. Сделать основную таблицу со статистикой по дням с возможностью детального просмотра почасовой статистики в каждом дне.<br />
            2. Сортировки, фильтры по дате, форматирование и проверка данных.
          </p>

          <h1>Групировка по дню</h1>
          <Table groupByDay={true} />

          <h1>Таблица на 18.06</h1>
          <small>Где показывать? В модальном?</small>
          <Table forDay={"18.06"} />

          <h1>Полная таблица</h1>
          <Table />

        </div>
      </div>
    );
  }
}

export default App;
