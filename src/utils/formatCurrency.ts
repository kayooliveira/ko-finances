export function formatCurrency(value: number): string {
  const formattedValueInBrl = value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
  return formattedValueInBrl
}
