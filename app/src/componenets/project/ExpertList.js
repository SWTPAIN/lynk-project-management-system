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
      <div>
        <div>{name}</div>
        <div onClick={this.handleDeleteClick}>delete</div>
        <input
          type='checkbox'
          defaultChecked={isApproved}
          value={isApproved}
          onChange={this.handleValueChange}
        />
      </div>
    )
  }
}

export default class ExpertList extends PureComponent {
  render () {
    const {experts} = this.props
    return (
      <div>
        <input
          placeholder='New Expert Name'
          ref={node => {
            this.input = node
          }} />
        <button onClick={this.handleAddExpert}>
              +
        </button>
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
