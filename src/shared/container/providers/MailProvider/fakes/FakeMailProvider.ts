import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  /**
   * Envio de email fakes para testes
   */

  private message: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.message.push({
      to,
      body,
    });
  }
}
