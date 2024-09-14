"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Payroll() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      title: "Software Engineer",
      salary: 80000,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Product Manager",
      salary: 90000,
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      title: "Designer",
      salary: 70000,
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Lee",
      title: "QA Analyst",
      salary: 65000,
      status: "Active",
    },
    {
      id: 5,
      name: "Tom Wilson",
      title: "DevOps Engineer",
      salary: 85000,
      status: "Active",
    },
  ]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    title: "",
    salary: 0,
    status: "Active",
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [payrollReports, setPayrollReports] = useState([
    {
      id: 1,
      month: "January",
      year: 2023,
      totalPayroll: 380000,
      averageSalary: 76000,
    },
    {
      id: 2,
      month: "February",
      year: 2023,
      totalPayroll: 390000,
      averageSalary: 78000,
    },
    {
      id: 3,
      month: "March",
      year: 2023,
      totalPayroll: 400000,
      averageSalary: 80000,
    },
    {
      id: 4,
      month: "April",
      year: 2023,
      totalPayroll: 410000,
      averageSalary: 82000,
    },
    {
      id: 5,
      month: "May",
      year: 2023,
      totalPayroll: 420000,
      averageSalary: 84000,
    },
  ]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handleAddEmployee = () => {
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
    setNewEmployee({ name: "", title: "", salary: 0, status: "Active" });
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSaveEmployee = () => {
    setEmployees(
      employees.map((emp) =>
        emp.id === editingEmployee.id ? editingEmployee : emp
      )
    );
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleMakePayment = () => {
    console.log(`Payment method: ${paymentMethod}, Amount: ${paymentAmount}`);
    setPaymentMethod("");
    setPaymentAmount(0);
  };

  const totalEmployees = employees.length;
  const totalPayroll = employees.reduce((total, emp) => total + emp.salary, 0);
  const averageSalary = totalPayroll / totalEmployees;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Payroll Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Records Section */}
        <div className="rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl font-bold mb-4">Employee Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-500 text-white">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Job Title</th>
                  <th className="px-4 py-2 text-right">Salary</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className={`border-b ${
                      editingEmployee?.id === employee.id
                        ? "bg-gray-100"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <td className="px-4 py-2">
                      {editingEmployee?.id === employee.id ? (
                        <Input
                          type="text"
                          value={editingEmployee.name}
                          onChange={(e) =>
                            setEditingEmployee({
                              ...editingEmployee,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        employee.name
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee?.id === employee.id ? (
                        <Input
                          type="text"
                          value={editingEmployee.title}
                          onChange={(e) =>
                            setEditingEmployee({
                              ...editingEmployee,
                              title: e.target.value,
                            })
                          }
                        />
                      ) : (
                        employee.title
                      )}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {editingEmployee?.id === employee.id ? (
                        <Input
                          type="number"
                          value={editingEmployee.salary}
                          onChange={(e) =>
                            setEditingEmployee({
                              ...editingEmployee,
                              salary: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        `$${employee.salary.toLocaleString()}`
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editingEmployee?.id === employee.id ? (
                        <Select
                          value={editingEmployee.status}
                          onChange={(e) =>
                            setEditingEmployee({
                              ...editingEmployee,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </Select>
                      ) : (
                        employee.status
                      )}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {editingEmployee?.id === employee.id ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={handleSaveEmployee}
                          >
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingEmployee(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => handleEditEmployee(employee)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEmployee(employee.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Employee Section */}
        <div className="rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                type="text"
                value={newEmployee.title}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="number"
                value={newEmployee.salary}
                onChange={(e) =>
                  setNewEmployee({
                    ...newEmployee,
                    salary: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={newEmployee.status}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </div>
            <Button onClick={handleAddEmployee} className="bg-gray-400">
              Add Employee
            </Button>
          </div>
        </div>
      </div>

      {/* Payroll Summary Section */}
      <div className="rounded-lg shadow-md p-4 sm:p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Payroll Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-bold">Total Employees</h3>
            <p className="text-4xl font-bold">{totalEmployees}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Total Payroll</h3>
            <p className="text-4xl font-bold">
              ${totalPayroll.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Average Salary</h3>
            <p className="text-4xl font-bold">
              ${averageSalary.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Payroll Reports Section */}
      <div className="rounded-lg shadow-md p-4 sm:p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Monthly Payroll Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-500 text-white">
                <th className="px-4 py-2 text-left">Month</th>
                <th className="px-4 py-2 text-right">Total Payroll</th>
                <th className="px-4 py-2 text-right">Average Salary</th>
              </tr>
            </thead>
            <tbody>
              {payrollReports.map((report) => (
                <tr key={report.id} className="border-b">
                  <td className="px-4 py-2">{`${report.month} ${report.year}`}</td>
                  <td className="px-4 py-2 text-right">
                    ${report.totalPayroll.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    ${report.averageSalary.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Make Payment Section */}
      <div className="rounded-lg shadow-md p-4 sm:p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Make Payment</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select payment method</option>
              <option value="credit-card">Credit Card</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="payment-amount">Payment Amount</Label>
            <Input
              id="payment-amount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
            />
          </div>
          <Button onClick={handleMakePayment}>Make Payment</Button>
        </div>
      </div>
    </div>
  );
}
