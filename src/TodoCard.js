import { Card, Row, Col } from 'antd';
import React from 'react';
import { ItemTypes } from './util/item';
import { useDrag } from 'react-dnd';

//get extraProps from collecting functions
const TodoCard = (props) => {
  const { todo } = props;
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      title: todo.title,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? '0.5' : '1';

  return (
    <span ref={drag} style={{ opacity, padding: 0, margin: 0 }}>
      <Card className="todo-card" title={todo.title}>
        <p>{todo.status}</p>
      </Card>
    </span>
  );
};

export default TodoCard;
