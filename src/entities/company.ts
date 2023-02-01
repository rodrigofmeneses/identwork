export interface CompanyProps {
  id?: string
  name: string
}

export class Company {
  private props: CompanyProps

  constructor(props: CompanyProps) {
    this.props = props
  }

  set id(value) {
    this.props.id = value
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }
}