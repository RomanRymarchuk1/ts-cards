const createReg = (keyWord: string): RegExp => {
   return new RegExp("\\b" + keyWord + "\\b", "gi");
};

export default createReg;
