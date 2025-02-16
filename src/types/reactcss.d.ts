declare module "reactcss" {
  type StyleObject = Record<string, string | number>; // Defines CSS properties as key-value pairs

  type ReactCSSInput = {
    [state: string]: Record<string, StyleObject>;
  };

  const reactCSS: (
    input: ReactCSSInput,
    state?: string[]
  ) => Record<string, StyleObject>;

  export default reactCSS;
}
