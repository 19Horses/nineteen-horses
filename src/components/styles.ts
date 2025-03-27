import { isMobile } from 'react-device-detect';
import { keyframes, styled } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
    visibility: hidden;
  }
`;

export const Form = styled.form<{ $isSubmitted: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  & > * {
    opacity: ${({ $isSubmitted }) => ($isSubmitted ? 1 : 0)};
    animation: ${({ $isSubmitted }) => ($isSubmitted ? fadeOut : fadeIn)} 0.5s
      ease-in-out forwards;
  }

  & > *:nth-child(1) {
    animation-delay: 0.2s;
  }

  & > *:nth-child(2) {
    animation-delay: 0.2s;
  }

  & > *:nth-child(3) {
    animation-delay: 0.4s;
  }

  & > *:nth-child(4) {
    animation-delay: 0.6s;
  }

  & > *:nth-child(5) {
    animation-delay: 0.8s;
  }
`;

export const Title = styled.p`
  color: white;
  text-align: left;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const Label = styled.label`
  color: white;
  font-size: 16px;
`;

export const Input = styled.input`
  background-color: black;
  font-family: 'Mono';
  outline: none;
  border: none;
  border: 1px solid white;
  padding: 4px;
  color: white;
  font-size: 16px;

  &:valid {
    background-color: black;
  }
`;

export const TextArea = styled.textarea`
  background-color: black;
  font-family: 'Mono';
  outline: none;
  border: none;
  border: 1px solid white;
  padding: 4px;
  color: white;
  font-size: 16px;
  max-width: 100%;
  height: 100px;
  resize: none;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
  width: ${isMobile ? '80%' : '25%'};
`;

export const Button = styled.button`
  color: white;
  cursor: pointer;
  border: 1px solid white;
  padding: 4px;
  background-color: black;
  outline: none;
  font-family: 'Mono';
  padding: 8px 12px;
  margin-top: 20px;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.span`
  width: 15px;
  height: 15px;
  border: 3px solid white;
  opacity: 1;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
  animation-delay: 0;
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: justify;
  margin: 0;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  width: ${isMobile ? '80%' : '25%'};
`;

export const ThankYouMessage = styled.p`
  color: white;

  opacity: 1;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
`;
