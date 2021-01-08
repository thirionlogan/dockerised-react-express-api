import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 16,
    padding: 8,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [books, setBooks] = useState([]);

  const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
  });

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  const loadBooks = () => {
    instance.get('books').then(({ data }) => setBooks(data ? data : []));
  };

  const handleCheckOutBook = (id) => {
    instance.post(`books/${id}/checkout/1`).then(() => loadBooks()); //TODO user Id
  };

  const handleReturnBook = (id) => {
    instance.post(`books/${id}/return`).then(() => loadBooks());
  };

  return (
    <Container>
      {books
        .sort((bookA, bookB) => bookA.id - bookB.id)
        .map(({ id, title, author, ISBN, dueDate, user_id }) => (
          <Paper className={classes.paper} key={`book-${id}`}>
            <Typography>{title}</Typography>
            <Typography color='textSecondary'>by {author}</Typography>
            {dueDate ? (
              <>
                <Typography color='textSecondary'>
                  Due Date: {moment(dueDate).format('dddd Do MMM YYYY')}
                </Typography>
                <Typography color='textSecondary'>
                  Checked out by User: {user_id}
                </Typography>
              </>
            ) : null}
            <Typography color='textSecondary'>ISBN: {ISBN}</Typography>
            {dueDate ? (
              <Button
                variant='contained'
                color='secondary'
                onClick={() => handleReturnBook(id)}
              >
                Return
              </Button>
            ) : (
              <Button
                variant='contained'
                color='primary'
                onClick={() => handleCheckOutBook(id)}
              >
                Check Out
              </Button>
            )}
          </Paper>
        ))}
    </Container>
  );
};
export default Home;
