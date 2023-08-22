export function validateAndFormatCPF(cpf: string) {
  const regexForValidateCPF = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/
  const cpfValidated = cpf.match(regexForValidateCPF)[0]

  const regexForOnlyNumbers = /[^0-9]/g
  const formatedCPF = cpfValidated.replace(regexForOnlyNumbers, '')

  return formatedCPF
}