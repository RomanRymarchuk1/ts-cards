const textReduction = (initText: string, charactersCount: number): string =>
   initText.length > charactersCount ? `${initText.slice(0, charactersCount)}...` : initText;

export default textReduction;
