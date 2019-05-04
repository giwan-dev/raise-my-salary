import React from 'react'
import { getCommonRatio } from './commonRatio'

interface SalaryRateCalculatorState {
  initialSalary: number
  finalSalary: number
  year: number
  result: string|null
}

export default class SalaryRateCalculator extends React.Component<{}, SalaryRateCalculatorState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      finalSalary: 0,
      initialSalary: 0,
      result: null,
      year: 0,
    }

    this.handleInitialSalaryInputChange = this.handleInitialSalaryInputChange.bind(this)
    this.handleFinalSalaryInputChange = this.handleFinalSalaryInputChange.bind(this)
    this.handleYearInputChange = this.handleYearInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.renderResult = this.renderResult.bind(this)
    this.renderResetButton = this.renderResetButton.bind(this)
  }

  public handleInitialSalaryInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      initialSalary: e.currentTarget.valueAsNumber,
    })
  }

  public handleFinalSalaryInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      finalSalary: e.currentTarget.valueAsNumber,
    })
  }

  public handleYearInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      year: e.currentTarget.valueAsNumber,
    })
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { initialSalary, finalSalary, year } = this.state
    const commonRatio = getCommonRatio(initialSalary, finalSalary, year)
    this.setState({
      result: ((commonRatio - 1) * 100).toFixed(1),
    })
  }

  public handleReset() {
    this.setState({
      finalSalary: 0,
      initialSalary: 0,
      result: null,
      year: 0,
    })
  }

  public renderResult() {
    const { result } = this.state

    if (result !== null) {
      return (
        <div>
          매년 {result}% 인상으로 달성할 수 있습니다! 화이팅!
        </div>
      )
    }
    return null
  }

  public renderResetButton() {
    if (this.state.result !== null) {
      return (
        <button
          type="reset"
          onClick={this.handleReset}
        >
          다시하기
        </button>
      )
    }
  }

  public render() {
    const { initialSalary, finalSalary, year } = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="number"
              value={year}
              onChange={this.handleYearInputChange}
            />
            년 동안
          </label>
          <label>
            나의 연봉
            <input
              type="number"
              value={initialSalary}
              onChange={this.handleInitialSalaryInputChange}
            />
            원을
          </label>
          <label>
            <input
              type="number"
              value={finalSalary}
              onChange={this.handleFinalSalaryInputChange}
            />
            원으로 만들겠다!!
          </label>
          <button type="submit">도전!</button>
          {this.renderResetButton()}
        </form>
        {this.renderResult()}
      </div>
    )
  }
}
