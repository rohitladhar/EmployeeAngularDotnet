using Microsoft.EntityFrameworkCore;
using WebApplication15.Data;

namespace apis.Data
{
    public class EmployeeRepository
    {
        private readonly AppDbContext _appDbContext;
        public EmployeeRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task AddEmployee(Employee employee)
        {
            await _appDbContext.Set<Employee>().AddAsync(employee);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task<List<Employee>> GetAllEmployee()
        {
            return await _appDbContext.Employees.ToListAsync();
        }
        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _appDbContext.Employees.FindAsync(id);
        }
        public async Task UpdateEmployee(int id, Employee model)
        {
            var employee = await _appDbContext.Employees.FindAsync(id);
            if(employee == null)
            {
                throw new Exception("Employee is not found");
            }
            employee.Name = model.Name;
            employee.Phone = model.Phone;
            employee.Age = model.Age;
            employee.Salary = model.Salary;
            await _appDbContext.SaveChangesAsync();
        }
        public async Task DeleteEMployeeById(int id)
        {
            var employee = await _appDbContext.Employees.FindAsync(id) ?? throw new Exception("Employee is not found");
            _appDbContext.Employees.Remove(employee);
            await _appDbContext.SaveChangesAsync();
        }
    }
}