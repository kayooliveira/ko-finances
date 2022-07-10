export enum Category {
  other = 'Outro',
  food = 'Alimentação',
  sell = 'Venda',
  house = 'Casa'
}

export type Transaction = {
  id: string
  type: 'income' | 'outcome'
  amount: number
  title: string
  category: Category
  userId: string
  createdAt: Date
}
