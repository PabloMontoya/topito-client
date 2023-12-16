import React, { useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import Editor from '@monaco-editor/react';
import { launch } from '../../api/backworker';
import useNotification from '../../context/Notification/useNotification';
import { NOTIFICATION_TYPES } from '../../constants/notificationTypes';
import { MESSAGES } from '../../constants/messages';
import jsonData from '../../mocks/data.json';

const { SUCCESS, ERROR } = NOTIFICATION_TYPES;

const HomeForm = () => {
  const theme = useTheme();
  const showNotification = useNotification();
  const [json, setJson] = useState(JSON.stringify(jsonData.back_json, null, 2));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await launch(json)
      .then((response) => {
        if (response.code === 200) {
          showNotification(SUCCESS, response.message);
        } else {
          showNotification(ERROR, response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        showNotification(ERROR, MESSAGES.SOMETHING_WENT_WRONG);
      });
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#1e1e1e',
        borderRadius: '10px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Editor
          height="400px"
          language="json"
          theme="vs-dark"
          value={json}
          onChange={setJson}
          options={{
            fontSize: 16,
          }}
        />
        <Button
          type="submit"
          fullWidth
          sx={{
            marginY: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default HomeForm;
