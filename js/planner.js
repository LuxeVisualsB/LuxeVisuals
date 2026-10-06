import { business, rand } from './config.js';

export function initPlanner() {
  const form = document.querySelector('#planner-form');
  if (!form) return;
  const profit = form.elements.profit;
  const budget = form.elements.budget;
  const fee = form.elements.fee;
  const tabs = [...form.querySelectorAll('[data-plan]')];
  const contact = document.querySelector('#planner-contact');
  let plan = 'test';
  let customBudget = 3000;
  const update = () => {
    const values = [profit, budget, fee];
    const valid = values.every(input => input.value.trim() !== '' && Number.isFinite(input.valueAsNumber) && input.checkValidity());
    const error = document.querySelector('#planner-error');
    if (!valid) {
      document.querySelector('#break-even').textContent = '—';
      document.querySelector('#marketing-total').textContent = '—';
      document.querySelector('#service-fee').textContent = '—';
      error.textContent = 'Enter a profit above R0 and non-negative costs, up to R1,000,000 each.';
      contact.href = 'contact.html?source=planner';
      return;
    }
    error.textContent = '';
    const total = budget.valueAsNumber + fee.valueAsNumber;
    const bookings = Math.ceil(total / profit.valueAsNumber);
    document.querySelector('#break-even').textContent = String(bookings);
    document.querySelector('#marketing-total').textContent = rand(total);
    document.querySelector('#service-fee').textContent = `${rand(budget.valueAsNumber)} + ${rand(fee.valueAsNumber)}`;
    const query = new URLSearchParams({ source: 'planner', plan, budget: budget.value, profit: profit.value, fee: fee.value });
    contact.href = `contact.html?${query}`;
  };
  tabs.forEach(button => button.addEventListener('click', () => {
    if (plan === 'custom') customBudget = Number.isFinite(budget.valueAsNumber) ? budget.valueAsNumber : 3000;
    plan = button.dataset.plan;
    tabs.forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
    budget.readOnly = plan === 'test';
    budget.value = plan === 'test' ? business.testAdBudget : customBudget;
    document.querySelector('#budget-hint').textContent = plan === 'test' ? 'Your R1,500 test goes into advertising.' : 'Choose an amount for your scenario. Your actual campaign budget is agreed together.';
    update();
  }));
  form.addEventListener('input', update);
  form.addEventListener('submit', event => event.preventDefault());
  form.hidden = false;
  document.querySelector('#planner-fallback').hidden = true;
  update();
}
