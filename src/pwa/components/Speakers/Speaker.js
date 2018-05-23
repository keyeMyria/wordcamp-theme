/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import Gravatar from 'react-gravatar';
import SessionCard from './SessionCard';
import { sessionsContext } from '../../contexts';

const Speaker = ({ name, gravatar, content, sessions }) => {
  const columns = sessions.map(({ type, id }) => [{ type, id }]);

  return (
    <Container>
      <Name>{name}</Name>
      <div>
        {gravatar && (
          <Avatar>
            <Gravatar md5={gravatar} size={88} />
          </Avatar>
        )}
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      {sessions.map(session => (
        <SessionCard key={session.id} session={session} context={sessionsContext(columns)} />
      ))}
    </Container>
  );
};

Speaker.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default inject(({ theme }, { item: { id } }) => ({
  name: theme.speaker(id).name,
  gravatar: theme.speaker(id).gravatar,
  content: theme.speaker(id).entity.content,
  sessions: theme.speaker(id).sessions.peek(),
}))(Speaker);

const Container = styled.div`
  box-sizing: border-box;
  padding: 56px 24px 72px 24px;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Name = styled.h3`
  padding: 24px 0 16px 0;
  margin: 0;
  font-size: 22px;
  font-weight: normal;
  line-height: 28px;
  color: ${({ theme }) => theme.color.black};
`;

const Content = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.color.darkGrey};

  & > p:first-child {
    margin-top: 0;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  margin: 0 16px 12px 0;
  float: left;
  box-shadow: 4px 4px 0 0 ${({ theme }) => theme.color.yellow};
  background: ${({ theme }) => theme.color.black};

  img {
    filter: grayscale(100%);
  }
`;
