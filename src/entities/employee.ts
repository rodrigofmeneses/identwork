export interface EmployeeProps {
  id: string
  name: string
  war_name: string
  role: string
  identification: string
  admission_date: Date
  print: Boolean
  company: {
    id: string
    name: string
  }
}

export class Employee {
  private props: EmployeeProps

  constructor(props: EmployeeProps) {
    this.props = props
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get war_name() {
    return this.props.war_name
  }

  get role() {
    return this.props.role
  }

  get identification() {
    return this.props.identification
  }

  get admission_date() {
    return this.props.admission_date
  }

  get print() {
    return this.props.print
  }

  get company() {
    return this.props.company
  }
}