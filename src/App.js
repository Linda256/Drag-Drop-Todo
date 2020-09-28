import React from 'react';
import { Row, Col } from 'antd';
import { useDrop } from 'react-dnd';

import './App.css';
import TodoCard from './TodoCard';
import { ItemTypes } from './util/item';

const todos = [
  {
    title: 'play tennis 1 ',
    status: 'todo',
  },
  {
    title: 'learn react dnd 1',
    status: 'in process',
  },

  {
    title: 'watch a movie 1',
    status: 'done',
  },
  {
    title: 'play tennis 2',
    status: 'todo',
  },
  {
    title: 'learn react dnd 2',
    status: 'in process',
  },

  {
    title: 'watch a movie 2',
    status: 'done',
  },
  {
    title: 'play tennis 3',
    status: 'todo',
  },
  {
    title: 'learn react dnd 3',
    status: 'in process',
  },

  {
    title: 'watch a movie 3',
    status: 'done',
  },
];

const markStatus = (title, status) => {
  for (let i = 0, len = todos.length; i < len; i++) {
    if (todos[i].title === title) {
      todos[i].status = status;
    }
  }
};

const getFiltedTodos = (status) => {
  return todos.filter((t) => t.status === status).map((todo) => <TodoCard todo={todo} />);
};

function App() {
  const [{ isWIPOver }, dropWIP] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      markStatus(item.title, 'in process');
    },
    collect: (monitor) => ({
      isWIPOver: !!monitor.isOver(),
    }),
  });

  const [{ isNotDoOver }, dropNotDo] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      markStatus(item.title, 'todo');
    },
    collect: (monitor) => ({
      isNotDoOver: !!monitor.isOver(),
    }),
  });

  const [{ isDoneOver }, dropDone] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      markStatus(item.title, 'done');
    },
    collect: (monitor) => ({
      isDoneOver: !!monitor.isOver(),
    }),
  });

  return (
    <>
      <Row className="container">
        <Col ref={dropNotDo} className="todo" md={8} xm={24}>
          <Row className="cards-container">{getFiltedTodos('todo')}</Row>
        </Col>
        <Col ref={dropWIP} className="in-process" md={8} xm={24}>
          <Row className="cards-container">{getFiltedTodos('in process')}</Row>
        </Col>
        <Col ref={dropDone} className="done" md={8} xm={24}>
          <Row className="cards-container">{getFiltedTodos('done')}</Row>
        </Col>
      </Row>
    </>
  );
}

export default App;
