export const sortCountries = (data) => data.sort((a, b) => {
  if(a.cases > b.cases) return -1
  if(a.cases < b.cases) return 1
  return 0
})