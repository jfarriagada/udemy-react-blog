import React, { Component } from 'react'
// redux 
import { connect } from 'react-redux'
import axios from 'axios'


class Pagination extends Component {
    componentDidMount = () => {
        this.props.set_total()
    }

    pages = ()=> {
        var posts = this.props.pagination.total
        var total = Math.ceil(posts/3) // redondea al prox numero
        var init = 1
        var end = 10
        var list = []

        if (total <= 10) {
            end = total
        }else if(total > 10) {
            // final
            if (this.props.pagination.page >= total - 4) {
                init = total - 9
                end = total
            }
            // inicio
            else if (this.props.pagination.page - 4 <= 0) {
                init = 1
                end = 10
            }
            // todo lo demas
            else {
                init = this.props.pagination.page -4
                end = this.props.pagination.page +5
            }
        }

        var barra = () => {
            for(let i=init; i <= end; i++) {
              list = list.concat(
                <th key={i} onClick={(e)=> {
                    this.props.set_current(parseInt(e.target.innerHTML))}}>
                    {i}
                </th>   
              )
            }
            return list
        }

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            {barra()}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        
    }

  render() {
    return (
      <div>
          <h4>
              Paginación
              { this.props.pagination.page }
          </h4>
          {this.pages()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        pagination: state.pagination
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      set_total: ()=>{
          axios.get('https://blog-api-u.herokuapp.com/v1/totalposts')
          .then(function(response){
             console.log(response)
             dispatch({type:'SET_TOTAL', total: parseInt(response.data)})
          })
          .catch(function(error){
            console.log(error)
          })
      },
      set_current: (e)=> {
          dispatch({type:'SET_CURRENT', page: e})
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)