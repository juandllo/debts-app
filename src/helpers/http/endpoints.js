import { env } from '../../environment/environment'

export const endpoints = {
    addDebtor: `${env.api}/debtors/addDebtor`,
    getDebtors: `${env.api}/debtors/getDebtors`,
    getDebtor: `${env.api}/debtors/getDebtor`,
    createDebt: `${env.api}/debtors/createDebt`,
    createDue: `${env.api}/debtors/createDue`,
}