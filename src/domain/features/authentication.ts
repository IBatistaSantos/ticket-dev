export interface Authentication {
  execute(params: Authentication.Params): Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  };

  export type Result = object | null;
}
