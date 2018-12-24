let order = 0;

export class WebAuth {
  authorize(): void {
    /**/
  }

  parseHash(callback: Function): void {
    order++;

    return callback(
      undefined,
      order !== 1
        ? {}
        : {
            accessToken: 'test',
            idToken: 'test',
            expiresIn: 7200
          }
    );
  }
}
