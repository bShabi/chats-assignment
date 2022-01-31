let messages: string[] = [];

export const addMessage = (message: string) => {
  messages.push(message);
};
export const getAllMessages = (): string[] => {
  return messages;
};
