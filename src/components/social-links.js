import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import createPersistedState from 'use-persisted-state';

import { SocialIcon } from '../styled';

const SocialLink = ({ innerRef, link, icon, label, ...other }) => (
  <SocialIcon
    ref={innerRef}
    aria-label={label}
    href={link}
    target='_blank'
    rel='noopener noreferrer'
    {...other}
  >
    <FontAwesomeIcon icon={['fab', icon]} className='text-2xl' fixedWidth />
  </SocialIcon>
);

const usePersistedState = createPersistedState('socials');

const SocialLinks = ({ social }) => {
  const [socials, setSocials] = usePersistedState(Object.keys(social));

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    setSocials(socials => {
      const [dragged] = socials.splice(source.index, 1);
      socials.splice(destination.index, 0, dragged);
      return [...socials];
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='socials' direction='horizontal'>
        {({ innerRef, droppableProps, placeholder }) => (
          <div ref={innerRef} {...droppableProps} className='row'>
            {socials.map((website, index) => (
              <Draggable key={website} draggableId={website} index={index}>
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <SocialLink
                    innerRef={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                    link={social[website]}
                    label={website}
                    icon={website}
                  />
                )}
              </Draggable>
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SocialLinks;
