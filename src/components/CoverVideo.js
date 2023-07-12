import React from 'react';
import styled from 'styled-components';
import CaraMicloImage from '../assets/Cara_Miclo.png';

const ImageContainer = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 64em) {
    min-width: 40vh;
  }
`;

const CoverImage = () => {
  return (
    <ImageContainer>
      <img src={CaraMicloImage} alt="Cara Miclo" />
    </ImageContainer>
  );
};

export default CoverImage;
