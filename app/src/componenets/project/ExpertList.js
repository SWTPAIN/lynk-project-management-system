import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { remove, update } from 'ramda'
import { Expert } from '../../propTypes'

class ExpertItem extends PureComponent {
  handleValueChange = (e) => {
    this.props.handleIsApprovedChange(this.props.index, e.target.checked)
  }

  handleDeleteClick = () => {
    this.props.handleDeleteItem(this.props.index)
  }

  render () {
    const {name, isApproved} = this.props.expert
    return (
      <li>
        <div>
          {name}
          <a uk-tooltip='title: Delte Expert' uk-icon='close' onClick={this.handleDeleteClick} />
          <label>
            <input
              type='checkbox'
              className='uk-checkbox'
              defaultChecked={isApproved}
              value={isApproved}
              onChange={this.handleValueChange}
            />
          Approved
          </label>
        </div>
      </li>
    )
  }
}

export default class ExpertList extends PureComponent {
  render () {
    const {experts} = this.props
    return (
      <div>
        <h3 className='uk-text-small'>
          Experts
        </h3>
        <div className='uk-inline'>
          <input
            className='uk-input'
            placeholder='New Expert Name'
            onKeyPress={this.handleKeyPress}
            ref={node => {
              this.input = node
            }} />
        </div>
        <a uk-icon='plus' onClick={this.handleAddExpert} />
        <ul className='uk-list'>
          {
            experts.map((expert, i) =>
              <ExpertItem
                key={expert.name + i}
                index={i}
                expert={expert}
                handleIsApprovedChange={this.handleExpertIsApprovedChange}
                handleDeleteItem={this.handleDeleteExpert}
              />
            )
          }
        </ul>
      </div>
    )
  }

  handleAddExpert = (e) => {
    e.preventDefault()
    if (this.input.value === '') {
      return
    }
    this.props.handleValueChange(
      [...this.props.experts, {name: this.input.value, isApproved: false}]
    )
    this.input.value = ''
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleAddExpert(e)
    }
  }

  handleExpertIsApprovedChange = (index, isApproved) => {
    const experts = this.props.experts
    this.props.handleValueChange(
      update(index, {...experts[index], isApproved}, experts)
    )
  }

  handleDeleteExpert = (index) => {
    this.props.handleValueChange(
      remove(index, 1, this.props.experts)
    )
  }
}

ExpertList.propTypes = {
  experts: PropTypes.arrayOf(Expert).isRequired,
  handleValueChange: PropTypes.func.isRequired
}
