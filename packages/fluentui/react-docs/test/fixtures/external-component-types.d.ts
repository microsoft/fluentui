import * as React from 'react'

export type TPropsChildren = {
  children?: React.Component | React.Component[]
}

export interface IPropsChildren {
  children?: React.Component | React.Component[]
}

export interface IPropsDocumented {
  /** Interface description
   * @param tagParam interface description tag
   */

   /**
    * propOptional descriptiong
    * @param tagParam prop description tag
    */
  propOptional?: string | string[]

  /**
   * propRequired description
   * @param tagParam prop required description tag
   */
  propRequired: string
}

export type TPropDocumented = {
  /** Type description
   * @param type type tag documentation
   */

   /**
    * propOptional description
    * @param propOptionalExported description
    */
  propOptionalExported?: string

   /**
    * propRequired description
    * @param propRequiredExported description
    */
  propRequiredExported: string
}
