import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Form,
  InputContainer,
  Label,
  Input,
  TextArea,
  Button,
  Title,
  Loader,
  ThankYouMessage,
  ErrorMessage,
} from './styles';

export const ClientDetails = ({ formWidth }: { formWidth: number }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwx576HUDvGuI9Gbc-6IefqAbe0HgvOqdRc9VjHBY0Hr7d4WojOuB70OjIFlDNvBS1k/exec',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        setIsLoading(false);
        setIsSubmitted(true);
        setTimeout(() => {
          setShowForm(false);
        }, 600);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <>
      {showForm && (
        <Form
          $width={formWidth}
          $isSubmitted={isSubmitted}
          onSubmit={handleSubmit}
        >
          <InputContainer>
            <Label htmlFor="name">Name:</Label>
            <Input
              value={formData.name}
              onChange={handleChange}
              required
              type="text"
              name="name"
              id="name"
              placeholder="Your name or company"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="email">Email:</Label>
            <Input
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              name="email"
              id="email"
              placeholder="you@email.com"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="message">Website:</Label>
            <TextArea
              value={formData.message}
              onChange={handleChange}
              required
              name="message"
              id="message"
              placeholder="A brief overview of what you want from the website"
            />
          </InputContainer>
          <Button type="submit">{isLoading ? <Loader /> : 'Submit'}</Button>
          {isError && (
            <ErrorMessage>Something went wrong, please try again!</ErrorMessage>
          )}
        </Form>
      )}
      {isSubmitted && !showForm && (
        <ThankYouMessage>Thanks, we&apos;ll be in touch!</ThankYouMessage>
      )}
    </>
  );
};
