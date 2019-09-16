type Extension = '-'
type Modifier = '__'

class Bemified {
  private constructor (
    public readonly value: string
  ) {}

  private fabricate = (x: string, e: Extension | Modifier) => `${this.value}${e}${x}`

  public extend = (x: string) => Bemified.of(this.fabricate(x, '-'))
  public modify = (x: string) => Bemified.of(this.fabricate(x, '__'))
  public join = (x: Bemified) => BemGroup.of([this, x])

  public static of = (x: string) => new Bemified(x)
}

class BemGroup {
  constructor(
    private readonly content: Bemified[]
  ) {}

  public extend = (x: string) => BemGroup.of(
    this.content.map(b => b.extend(x))
  )
      
  public modify = (x: string) => BemGroup.of(
    this.content.map(b => b.modify(x))
  )

  public value = () => this.content.map(x => x.value).join(' ')

  public static of = (x: Bemified[]) => new BemGroup(x)
}

export const baseClassName = Bemified.of('datepicker')

export const buttonClassName = baseClassName.extend('button')
